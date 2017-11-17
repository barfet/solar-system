function ZipFiles( $zipfilename, $sourcedir )
{
   Add-Type -Assembly System.IO.Compression.FileSystem
   $compressionLevel = [System.IO.Compression.CompressionLevel]::Optimal
   [System.IO.Compression.ZipFile]::CreateFromDirectory($sourcedir,
        $zipfilename, $compressionLevel, $false)
}

dotnet restore
dotnet publish -c release
if ($LASTEXITCODE -ne 0) { return }

$publishDirectory = "src/Logging.Api/bin/release/netcoreapp1.0/publish"
$packageName = "logging-api.zip"

rm "$publishDirectory/$packageName" -ErrorAction SilentlyContinue
ZipFiles "$(pwd)/$packageName" "$(pwd)/$publishDirectory"
mv "$packageName" $publishDirectory