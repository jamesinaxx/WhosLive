mod utils;

// TODO: Use the log crate and intercept that instead of this
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

use base64::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn initialize() {
    utils::set_panic_hook();
    log!("Initialized wasm!");
}

#[wasm_bindgen(js_name = downloadImage)]
/// Downloads the specified image url and converts it into a base64 url
pub async fn download_image(url: String) -> String {
    log!("Downloading {url}...");
    let download = reqwest::get(url).await.unwrap().bytes().await.unwrap();
    BASE64_URL_SAFE.encode(download)
}
