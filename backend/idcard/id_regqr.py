import os
import qrcode

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

def generate_qr_for_files(directory, qr_directory):
    """Generate a QR code for each file in the specified directory."""
    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path):
            # Create and save the QR code
            qr_code_path = os.path.join(qr_directory, os.path.splitext(filename)[0] + '.png')
            create_qr_code(filename, qr_code_path)
            print(f'Generated QR code for {filename} at {qr_code_path}')

# Example usage
id_dblist_path = './id_dblist'
id_qr_path = './id_qr'

# Ensure the QR code directory exists
os.makedirs(id_qr_path, exist_ok=True)

generate_qr_for_files(id_dblist_path, id_qr_path)
