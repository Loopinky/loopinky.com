$file = 'C:\Users\33612\Documents\site_LOOPINKY\fr\blog\meilleurs-cahiers-calligraphie.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Fix "Ou" heading - wrong accent was applied. Replace the wrong char with correct one
# Line 183: has O-grave + u, should be O + u-grave
$wrong = [char]0xD2 + 'u Acheter'
$right = 'O' + [char]0xF9 + ' Acheter'
$content = $content.Replace($wrong, $right)

# Fix remaining "qualite" on line 82 (second occurrence that was missed)
$content = $content.Replace('La qualite du design', 'La qualit' + [char]0xe9 + ' du design')

# Fix "l'edition Cowgirl" (lowercase l' version)
$content = $content.Replace("l'edition Cowgirl", "l'" + [char]0xe9 + "dition Cowgirl")

# Remove BOM if present
if ($content[0] -eq [char]0xFEFF) {
    $content = $content.Substring(1)
}

# Write without BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)
Write-Host "Done - remaining accents fixed"
