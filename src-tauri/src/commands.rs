use tauri::State;
use crate::AppState;


#[tauri::command]
pub fn read_image(state: State<AppState>) -> Result<String, String> {
    let index = state.index.lock().unwrap().clone();
    let file_path = state.file_paths.lock().unwrap()[index].clone();

    return read_image_from_path(file_path);
}

#[tauri::command]
pub fn next_image(state: State<AppState>) -> Result<String, String>{
    let mut index = state.index.lock().unwrap();
    *index += 1;
    if *index >= state.file_paths.lock().unwrap().len() {
        *index = 0;
    }
    let file_path = state.file_paths.lock().unwrap()[*index].clone();

    return read_image_from_path(file_path);
}

#[tauri::command]
pub fn prev_image(state: State<AppState>) -> Result<String, String>{
    let mut index = state.index.lock().unwrap();
    if *index == 0{
        *index = state.file_paths.lock().unwrap().len() - 1;
    }else{
        *index -= 1;
    }
    let file_path = state.file_paths.lock().unwrap()[*index].clone();

    return read_image_from_path(file_path);
}

fn read_image_from_path(file_path: String) -> Result<String, String> {
    match std::fs::read(file_path) {
        Ok(bytes) => {
            let base64_encoded = base64::encode(bytes);
            Ok(format!("data:image/png;base64,{}", base64_encoded))
        }
        Err(e) => Err(e.to_string()),
    }
}