import os
import hashlib
import qrcode

def hash_filename(filename):
    """Generate a SHA-256 hash for a given filename."""
    sha256 = hashlib.sha256()
    sha256.update(filename.encode('utf-8'))
    return sha256.hexdigest()

def create_qr_code(data, path):
    """Create a QR code containing the given data and save it to the specified path."""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(path)

def rename_and_generate_qr(directory, qr_directory):
    """Rename all files in the specified directory to their SHA-256 hash value and create a QR code for each."""
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            # Generate the new hashed filename
            hashed_name = hash_filename(filename)
            # Get the file extension
            file_extension = os.path.splitext(filename)[1]
            # Create the new file path with the hashed name
            new_file_path = os.path.join(directory, hashed_name + file_extension)
            # Rename the file
            os.rename(file_path, new_file_path)
            print(f'Renamed {filename} to {hashed_name + file_extension}')

            # Create and save the QR code
            qr_code_path = os.path.join(qr_directory, hashed_name + '.png')
            create_qr_code(hashed_name, qr_code_path)
            print(f'Generated QR code for {hashed_name} at {qr_code_path}')

# Example usage
id_dblist_path = './id_dblist'
id_qr_path = './id_qr'

# Ensure the QR code directory exists
os.makedirs(id_qr_path, exist_ok=True)

rename_and_generate_qr(id_dblist_path, id_qr_path)
