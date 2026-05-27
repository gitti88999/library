using System.ComponentModel.DataAnnotations;

namespace LIBRARY.Models
{
    public class City
    {
        public int CityId { get; set; }

        public string CityName { get; set; }

        public List<Collaborator> Collaborators { get; set; }
    }
}