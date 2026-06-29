// using System.Net;
// using System.Net.Mail;

// namespace LIBRARY.server.Services
// {
//     public class EmailService : IEmailService
//     {
//         private const string SystemEmail = "library-system@gmail.com";
//         private const string AppPassword = "xxxx xxxx xxxx xxxx"; // סיסמת אפליקציה

//         public async Task SendAsync(string to, string subject, string body)
//         {
//             using var client = new SmtpClient("smtp.gmail.com")
//             {
//                 Port = 587,
//                 Credentials = new NetworkCredential(
//                     SystemEmail,
//                     AppPassword
//                 ),
//                 EnableSsl = true
//             };

//             var mail = new MailMessage
//             {
//                 From = new MailAddress(SystemEmail),
//                 Subject = subject,
//                 Body = body,
//                 IsBodyHtml = false
//             };

//             mail.To.Add(to);

//             await client.SendMailAsync(mail);
//         }
//     }
// }
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Microsoft.Extensions.Options;
using System.Text;
using LIBRARY.Models;
public class EmailService
{
    private readonly GmailSettings _settings;
    private readonly HttpClient _httpClient;

    public EmailService(IOptions<GmailSettings> settings)
    {
        
        _settings = settings.Value;
    }

    public async Task SendEmailAsync(string to, string subject, string body)
    {
        Console.WriteLine($"REFRESH TOKEN = '{_settings.RefreshToken}'");
        var credential = GoogleCredential
            .FromAccessToken(await GetAccessTokenAsync())
            .CreateScoped(GmailService.Scope.GmailSend);

        var service = new GmailService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = "Apartment App"
        });

        var message = new Message
        {
            Raw = Base64UrlEncode(CreateEmail(to, _settings.Email, subject, body))
        };

        await service.Users.Messages.Send(message, "me").ExecuteAsync();
    }

    private async Task<string> GetAccessTokenAsync()
    {
        var clientSecrets = new ClientSecrets
        {
            ClientId = _settings.ClientId,
            ClientSecret = _settings.ClientSecret
        };

        var flow = new Google.Apis.Auth.OAuth2.Flows.GoogleAuthorizationCodeFlow(
            new Google.Apis.Auth.OAuth2.Flows.GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = clientSecrets,
                Scopes = new[] { GmailService.Scope.GmailSend }
            });

        var token = new Google.Apis.Auth.OAuth2.Responses.TokenResponse
        {
            RefreshToken = _settings.RefreshToken
        };

        var cred = new UserCredential(flow, "user", token);
        await cred.RefreshTokenAsync(CancellationToken.None);

        return cred.Token.AccessToken;
    }

    private static string CreateEmail(string to, string from, string subject, string body)
    {
        return
$@"To: {to}
From:  APARTMENT BROKERAGE <{from}>
Subject: {subject}
Content-Type: text/plain; charset=utf-8

{body}";
    }

    private static string Base64UrlEncode(string input)
    {
        var bytes = Encoding.UTF8.GetBytes(input);
        return Convert.ToBase64String(bytes)
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", "");
    }
}