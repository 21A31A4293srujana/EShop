using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyElectronicsAPI.Models;

namespace MyElectronicsAPI.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Price)
                .HasPrecision(18, 2);
                
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);
                
            builder.Property(p => p.Description)
                .HasMaxLength(500);
                
            builder.Property(p => p.Category)
                .IsRequired()
                .HasMaxLength(50);
                
            builder.Property(p => p.ImageUrl)
                .HasMaxLength(255);
        }
    }
} 