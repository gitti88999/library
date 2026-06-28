using System.Net;
using System.Net.Mail;

namespace LIBRARY.server.Services
{
    public class EmailService : IEmailService
    {
        private const string SystemEmail = "librarysystem@gmail.com";
        private const string AppPassword = "xxxx xxxx xxxx xxxx"; // סיסמת אפליקציה

        public async Task SendAsync(string to, string subject, string body)
        {
            using var client = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(
                    SystemEmail,
                    AppPassword
                ),
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress(SystemEmail),
                Subject = subject,
                Body = body,
                IsBodyHtml = false
            };

            mail.To.Add(to);

            await client.SendMailAsync(mail);
        }
    }
}