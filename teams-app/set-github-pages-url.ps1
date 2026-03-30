param(
  [Parameter(Mandatory = $true)]
  [string]$ConfigurationUrl,

  [Parameter(Mandatory = $true)]
  [string]$Domain,

  [Parameter(Mandatory = $false)]
  [string]$Version = "1.0.5"
)

$manifestPath = Join-Path $PSScriptRoot "manifest.json"
$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json

$manifest.version = $Version
$manifest.configurableTabs[0].configurationUrl = $ConfigurationUrl

$validDomains = @()
foreach ($d in $manifest.validDomains) {
  if ($d -ne "REPLACE_WITH_GITHUB_PAGES_DOMAIN") {
    $validDomains += $d
  }
}
if ($validDomains -notcontains $Domain) {
  $validDomains += $Domain
}
$manifest.validDomains = $validDomains

$manifest | ConvertTo-Json -Depth 100 | Set-Content $manifestPath -Encoding utf8
Write-Host "Updated manifest: $manifestPath"
Write-Host "configurationUrl=$ConfigurationUrl"
Write-Host "domain=$Domain"
Write-Host "version=$Version"
