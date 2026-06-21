using System.Net;
using System.Net.Mail;

namespace LIBRARY.server.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendAsync(string to, string subject, string body)
        {
            using var client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(
                    "yourEmail@gmail.com",
                    "your-app-password"
                ),
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress("yourEmail@gmail.com"),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };

            mail.To.Add(to);

            await client.SendMailAsync(mail);
        }
    }
}