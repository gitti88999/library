using System.Net.Http;
using System.Text.Json;
using LIBRARY.Models;
using LIBRARY.server.Services;


namespace LIBRARY.server.Services
{
public class GoogleOAuthService
{
    public async Task<string> GetAccessTokenAsync(GmailSettings settings)
    {
        using var client = new HttpClient();

        var data = new Dictionary<string, string>
        {
            ["client_id"] = settings.ClientId,
            ["client_secret"] = settings.ClientSecret,
            ["refresh_token"] = settings.RefreshToken,
            ["grant_type"] = "refresh_token"
        };

        var response = await client.PostAsync(
            "https://oauth2.googleapis.com/token",
            new FormUrlEncodedContent(data)
        );

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);

        return doc.RootElement.GetProperty("access_token").GetString();
    }
}}