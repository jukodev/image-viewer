// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Mutex;
mod setup;
mod commands;

use image;
use image::GenericImageView;
use tauri::{App, Manager, PhysicalSize};
fn main() {
    tauri::Builder::default()
    .setup(|app| {
                        set_window_size(app);
                        Ok(())
                })
    .manage(AppState {
            file_paths: Mutex::new(setup::get_file_paths()),
            index: Mutex::new(setup::get_start_index()),
    })
    .invoke_handler(tauri::generate_handler![commands::next_image, commands::read_image, commands::prev_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn set_window_size(app: &mut App) {
    if let Some(window) = app.get_window("main") {
        let file_path = setup::get_image_from_args();
        let img = image::open(file_path).unwrap();
        let (width, height) = img.dimensions();
        window.set_size(PhysicalSize::new(width, height)).unwrap();
    }
}

pub struct AppState {
    file_paths: Mutex<Vec<String>>,
    index: Mutex<usize>,
}
