param(
    [string]$SourceDir,
    [string]$ZipFilePath
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceFullPath = (Resolve-Path $SourceDir).Path

if (Test-Path $ZipFilePath) {
    Remove-Item -Path $ZipFilePath -Force
}

$zipArchive = [System.IO.Compression.ZipFile]::Open($ZipFilePath, [System.IO.Compression.ZipArchiveMode]::Create)

$files = Get-ChildItem -Path $sourceFullPath -Recurse -File
foreach ($file in $files) {
    # Replace all Windows backslashes with standard forward slashes for Linux compatibility
    $relativePath = $file.FullName.Substring($sourceFullPath.Length).TrimStart('\', '/').Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
        $zipArchive,
        $file.FullName,
        $relativePath,
        [System.IO.Compression.CompressionLevel]::Optimal
    )
}

$zipArchive.Dispose()
Write-Host "Created clean ZIP with forward slashes at $ZipFilePath"
