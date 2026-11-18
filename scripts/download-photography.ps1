$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$manifest = Get-Content -Raw -LiteralPath (Join-Path $root 'src/content/photography.json') | ConvertFrom-Json
$destination = Join-Path $root 'src/assets/photography'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
foreach ($entry in $manifest.PSObject.Properties) {
  $id = $entry.Value.id
  $target = Join-Path $destination "$id.jpg"
  if (Test-Path -LiteralPath $target) { continue }
  curl.exe --fail --location --retry 2 --silent --show-error "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85" --output $target
  if ($LASTEXITCODE -ne 0) { throw "Download failed for $id" }
  Write-Output "Downloaded $id"
}
