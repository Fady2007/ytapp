import qrcode
import sys
import os


def generate_qr_code(text, file_name):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(text)
    qr.make(fit=True)
    img = qr.make_image(fill_color="blue")
    # Get the Downloads directory path
    downloads_path = os.path.expanduser("~/Downloads")

    # Construct the full file path
    full_file_path = os.path.join(downloads_path, file_name)
    img.save(full_file_path)


if __name__ == "__main__":
    value = sys.argv[1]
    file_name = "qr.png"
    generate_qr_code(value, file_name)
    print(f"Qr code saved as {file_name}")
