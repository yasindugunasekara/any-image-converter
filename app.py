from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from PIL import Image
import os
import shutil
import uuid

app = Flask(__name__)
CORS(app)  # Allow frontend access

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "output"
ZIP_FOLDER = "zips"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)
os.makedirs(ZIP_FOLDER, exist_ok=True)

VALID_FORMATS = ["jpeg", "png", "bmp", "gif", "tiff", "webp"]
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB limit per file

@app.route("/convert", methods=["POST"])
def convert_images():
    if "images" not in request.files or "format" not in request.form:
        return jsonify({"error": "No files or format provided"}), 400
    
    files = request.files.getlist("images")
    output_format = request.form["format"].lower()

    if output_format not in VALID_FORMATS:
        return jsonify({"error": "Invalid format"}), 400

    converted_files = []
    for file in files:
        if file.filename == "":
            continue
        
        input_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(input_path)

        try:
            image = Image.open(input_path)
            if output_format in ["jpeg", "jpg"]:
                image = image.convert("RGB")  # Ensure compatibility for JPEG

            base_name = os.path.splitext(file.filename)[0]
            output_path = os.path.join(OUTPUT_FOLDER, f"{base_name}.{output_format}")
            image.save(output_path, format=output_format.upper())

            converted_files.append(output_path)
        except Exception as e:
            return jsonify({"error": f"Error processing {file.filename}: {str(e)}"}), 500

    if not converted_files:
        return jsonify({"error": "No files were converted"}), 400

    zip_name = f"converted_{uuid.uuid4().hex}.zip"
    zip_path = os.path.join(ZIP_FOLDER, zip_name)
    shutil.make_archive(zip_path.replace(".zip", ""), 'zip', OUTPUT_FOLDER)

    return send_file(zip_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
