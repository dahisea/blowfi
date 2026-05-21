# Copy index.md / _index.md -> *.zh-SG.md for every content directory
# so Hugo multilingual works with a single source file.
Get-ChildItem -Recurse -Path content -Include 'index.md', '_index.md' | ForEach-Object {
    $target = $_.FullName -replace '\.md$', '.zh-SG.md'
    if (-not (Test-Path $target)) {
        Copy-Item -LiteralPath $_.FullName -Destination $target
        Write-Output "Created: $target"
    }
}
