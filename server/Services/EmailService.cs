
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using Microsoft.Extensions.Options;
using System.Text;
using LIBRARY.Models;

namespace LIBRARY.Services
{
    public class EmailService
    {
        private readonly GmailSettings _settings;
        private readonly GoogleOAuthService _oauth;

        public EmailService(IOptions<GmailSettings> settings, GoogleOAuthService oauth)
        {
            _settings = settings.Value;
            _oauth = oauth;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var accessToken = await _oauth.GetAccessTokenAsync(_settings);

            var credential = GoogleCredential
                .FromAccessToken(accessToken)
                .CreateScoped(GmailService.Scope.GmailSend);

            var service = new GmailService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Library App"
            });

            var message = new Message
            {
                Raw = Base64UrlEncode(CreateEmail(to, _settings.Email, subject, body))
            };
            Console.WriteLine("Before Gmail send");

            await service.Users.Messages.Send(message, "me").ExecuteAsync();
            Console.WriteLine("After Gmail send");
        }

        private static string CreateEmail(string to, string from, string subject, string body)
        {
            return $@"To: {to}
From: APARTMENT BROKERAGE <{from}>
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
}