use std::path::Path;



pub fn get_image_from_args() -> String {
    let args: Vec<String> = std::env::args().collect();
    let file_path: String;
    if args.len() < 2 {
        file_path = "C:\\Users\\theju\\Pictures\\test\\ergohai.jpg".to_string();  
        //return Err("No file path provided".to_string()); for testing
    }else{
        file_path = args[1].clone();
    
    }
    return file_path;
}

pub fn get_file_paths() -> Vec<String> {
    let file_path = get_image_from_args();
    let directory = Path::new(&file_path).parent().unwrap();
    let mut file_paths: Vec<String> = Vec::new();
    let extensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    match std::fs::read_dir(directory) {
        Ok(entries) => {
            for entry in entries {
                match entry {
                    Ok(entry) => {
                        let path = entry.path();
                        let path_str = path.to_str().unwrap().to_string();
                        if path.is_file() && extensions.iter().any(|&ext| path_str.ends_with(ext)) {
                            file_paths.push(path.to_str().unwrap().to_string());
                        }
                    }
                    Err(e) => println!("Error reading directory entry: {}", e),
                }
            }
        }
        Err(e) => println!("Error reading directory: {}", e),
    }
    return file_paths;
}

pub fn get_start_index() -> usize {
    let paths = get_file_paths();
    let file_path = get_image_from_args();
    
    return paths.iter().position(|r| r == &file_path).unwrap();
}