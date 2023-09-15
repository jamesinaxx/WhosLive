use serde::{Deserialize, Serialize};

mod utils;

// TODO: Use the log crate and intercept that instead of this
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

use base64::prelude::*;
use image::{DynamicImage, GenericImageView};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn initialize() {
    utils::set_panic_hook();
    log!("Initialized wasm!");
}

#[derive(Debug, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Image {
    bytes: bytes::Bytes,
}

#[wasm_bindgen]
impl Image {
    pub async fn download_url(url: String) -> Self {
        log!("Downloading {url}...");
        let bytes = reqwest::get(url).await.unwrap().bytes().await.unwrap();

        Self { bytes }
    }

    pub fn to_base64(&self) -> String {
        let image_format = image::guess_format(&self.bytes).expect("valid image format");

        let data = BASE64_STANDARD.encode(&self.bytes);

        format!("data:{};base64,{data}", image_format.to_mime_type())
    }

    pub fn average_color(&self) -> Colour {
        let image = image::load_from_memory(&self.bytes).expect("valid image loaded");
        Colour::sqrt_algorithm(image)
    }
}

#[derive(Debug, Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Colour {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
    pub alpha: u8,
}

#[wasm_bindgen]
impl Colour {
    // #[wasm_bindgen]
    // pub fn to_object(&self) -> JsValue {}

    fn new(colours: [u8; 4]) -> Self {
        let [red, green, blue, alpha] = colours;

        Self {
            red,
            green,
            blue,
            alpha,
        }
    }

    #[wasm_bindgen]
    pub fn is_light(&self) -> bool {
        // http://www.w3.org/TR/AERT#color-contrast
        let result =
            ((self.red as u32) * 299 + (self.green as u32) * 587 + (self.blue as u32) * 114) / 1000;

        result < 128
    }

    fn sqrt_algorithm(image: DynamicImage) -> Self {
        let pixels = image.pixels();
        let mut red_total: u32 = 0;
        let mut green_total: u32 = 0;
        let mut blue_total: u32 = 0;
        let mut alpha_total: u32 = 0;
        let count = image.width() * image.height();

        for pixel in pixels {
            let [red, green, blue, alpha] = pixel.2 .0;
            red_total += red as u32;
            green_total += green as u32;
            blue_total += blue as u32;
            alpha_total += alpha as u32;
        }

        let red = red_total / alpha_total;
        let blue = blue_total / alpha_total;
        let green = green_total / alpha_total;
        let alpha = alpha_total / count;

        Self::new([red as u8, green as u8, blue as u8, alpha as u8])
    }
}
