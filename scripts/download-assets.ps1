$ErrorActionPreference = 'Stop'
$imagesDir = Join-Path $PSScriptRoot '..\public\images'
New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null

$assets = @(
  @{ Name = 'hero-wings.jpg'; Url = 'https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?auto=format&fit=crop&w=1200&q=85' },
  @{ Name = 'wings-photo.jpg'; Url = 'https://images.unsplash.com/photo-1725728286008-6bdec0508a71?auto=format&fit=crop&w=1000&q=85' },
  @{ Name = 'pizza-photo.jpg'; Url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85' },
  @{ Name = 'burger-photo.jpg'; Url = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85' },
  @{ Name = 'chicken-bucket.jpg'; Url = 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1100&q=85' }
)

foreach ($asset in $assets) {
  $destination = Join-Path $imagesDir $asset.Name
  Write-Host "Downloading $($asset.Name)..."
  Invoke-WebRequest -Uri $asset.Url -OutFile $destination
}
Write-Host "Downloaded food photos to public/images."
