import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import schedule
import time

def send_email():
    # Email details
    sender_email = "fady97993@gmail.com"
    sender_password = "fadyemadas3d"
    receiver_email = "fade9007@gmail.com"
    subject = "Daily Report"
    message = "Here's your daily report."

    # Set up the MIME object
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = receiver_email
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "plain"))

    # Create a secure connection with the server and send the email
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print("Error sending email:", e)

# Schedule the email to be sent daily at a specific time
send_email()
# schedule.every().day.at("15:28").do(send_email)

# while True:
#     schedule.run_pending()
#     time.sleep(1)
