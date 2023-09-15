mod utils;

use base64::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn initialize() {
    utils::set_panic_hook();
    println!("Good to go!");
}

#[wasm_bindgen(js_name = downloadImage)]
/// Downloads the specified image url and converts it into a base64 url
pub async fn download_image(url: String) -> String {
    utils::set_panic_hook();
    let download = reqwest::get(url).await.unwrap().bytes().await.unwrap();
    BASE64_URL_SAFE.encode(download)
}
