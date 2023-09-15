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
        BASE64_URL_SAFE.encode(&self.bytes)
    }
}
