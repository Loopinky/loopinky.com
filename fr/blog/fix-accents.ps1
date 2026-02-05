$file = 'C:\Users\33612\Documents\site_LOOPINKY\fr\blog\meilleurs-cahiers-calligraphie.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Meta description
$content = $content.Replace('Decouvrez les meilleurs', [char]0x44 + [string][char]0xe9 + 'couvrez les meilleurs')

# JSON-LD headline and description
$content = $content.Replace('Notre Selection"', 'Notre S' + [char]0xe9 + 'lection"')
$content = $content.Replace('Une selection des', 'Une s' + [char]0xe9 + 'lection des')
$content = $content.Replace('pour debutants et artistes intermediaires', 'pour d' + [char]0xe9 + 'butants et artistes interm' + [char]0xe9 + 'diaires')

# H1 title
$content = $content.Replace('>Selection<', '>S' + [char]0xe9 + 'lection<')

# Date
$content = $content.Replace('Fevrier', 'F' + [char]0xe9 + 'vrier')

# First paragraph
$content = $content.Replace('un debutant', 'un d' + [char]0xe9 + 'butant')
$content = $content.Replace('un artiste intermediaire', 'un artiste interm' + [char]0xe9 + 'diaire')
$content = $content.Replace('cherchant a perfectionner', 'cherchant ' + [char]0xe0 + ' perfectionner')
$content = $content.Replace('ses competences', 'ses comp' + [char]0xe9 + 'tences')
$content = $content.Replace('la difference', 'la diff' + [char]0xe9 + 'rence')
$content = $content.Replace('passe en', 'pass' + [char]0xe9 + ' en')
$content = $content.Replace('vous aider a trouver', 'vous aider ' + [char]0xe0 + ' trouver')
$content = $content.Replace('parfaitement a vos', 'parfaitement ' + [char]0xe0 + ' vos')

# Selection section
$content = $content.Replace('notre selection', 'notre s' + [char]0xe9 + 'lection')
$content = $content.Replace('de qualite', 'de qualit' + [char]0xe9)

# Bullet points - guided practice
$content = $content.Replace('Pratique guidee', 'Pratique guid' + [char]0xe9 + 'e')
$content = $content.Replace('pas a pas', 'pas ' + [char]0xe0 + ' pas')
$content = $content.Replace('qui developpent les competences', 'qui d' + [char]0xe9 + 'veloppent les comp' + [char]0xe9 + 'tences')

# Bullet points - variety
$content = $content.Replace('la variete maintient', 'la vari' + [char]0xe9 + 't' + [char]0xe9 + ' maintient')
$content = $content.Replace("l'interet", "l'int" + [char]0xe9 + "r" + [char]0xea + "t")
$content = $content.Replace('et developpe la', 'et d' + [char]0xe9 + 'veloppe la')

# Bullet points - special characters
$content = $content.Replace('caracteres speciaux', 'caract' + [char]0xe8 + 'res sp' + [char]0xe9 + 'ciaux')

# Bullet points - paper quality
$content = $content.Replace('Qualite du', 'Qualit' + [char]0xe9 + ' du')

# Bullet points - pages
$content = $content.Replace('pour developper la memoire', 'pour d' + [char]0xe9 + 'velopper la m' + [char]0xe9 + 'moire')

# Our Selection heading
$content = $content.Replace('>Notre Selection<', '>Notre S' + [char]0xe9 + 'lection<')

# June & Lucy paragraph
$content = $content.Replace('joliment concus', 'joliment con' + [char]0xe7 + 'us')
$content = $content.Replace('une esthetique', 'une esth' + [char]0xe9 + 'tique')
$content = $content.Replace("plait a un", "pla" + [char]0xee + "t " + [char]0xe0 + " un")
$content = $content.Replace('point de depart', 'point de d' + [char]0xe9 + 'part')
$content = $content.Replace('les debutants souhaitant apprendre des ecritures fluides et elegantes', 'les d' + [char]0xe9 + 'butants souhaitant apprendre des ' + [char]0xe9 + 'critures fluides et ' + [char]0xe9 + 'l' + [char]0xe9 + 'gantes')

# Second June & Lucy paragraph
$content = $content.Replace('comprennent generalement', 'comprennent g' + [char]0xe9 + 'n' + [char]0xe9 + 'ralement')
$content = $content.Replace('de tracage', 'de tra' + [char]0xe7 + 'age')
$content = $content.Replace('inspirantes a lettriner', 'inspirantes ' + [char]0xe0 + ' lettriner')
$content = $content.Replace('et adaptees aux debutants', 'et adapt' + [char]0xe9 + 'es aux d' + [char]0xe9 + 'butants')
$content = $content.Replace("vous etes attire", "vous " + [char]0xea + "tes attir" + [char]0xe9)
$content = $content.Replace('moderne et elegante', 'moderne et ' + [char]0xe9 + 'l' + [char]0xe9 + 'gante')

# Comics Lettering paragraph
$content = $content.Replace('de completement different', 'de compl' + [char]0xe8 + 'tement diff' + [char]0xe9 + 'rent')
$content = $content.Replace("d'ecritures cursives", "d'" + [char]0xe9 + "critures cursives")
$content = $content.Replace('inspires des bandes dessinees', 'inspir' + [char]0xe9 + 's des bandes dessin' + [char]0xe9 + 'es')

# Product card - exercises guides
$content = $content.Replace("d'exercices guides", "d'exercices guid" + [char]0xe9 + "s")

# Comics paragraph 2
$content = $content.Replace('BLOB repartis', 'BLOB r' + [char]0xe9 + 'partis')
$content = $content.Replace('plus de variete', 'plus de vari' + [char]0xe9 + 't' + [char]0xe9)
$content = $content.Replace('pratique guidee', 'pratique guid' + [char]0xe9 + 'e')
$content = $content.Replace('Il est ideal pour', 'Il est id' + [char]0xe9 + 'al pour')
$content = $content.Replace("s'interesse aux bandes dessinees", "s'int" + [char]0xe9 + "resse aux bandes dessin" + [char]0xe9 + "es")
$content = $content.Replace('plus energique', 'plus ' + [char]0xe9 + 'nergique')

# Beach Premium paragraph
$content = $content.Replace('qui preferent', 'qui pr' + [char]0xe9 + 'f' + [char]0xe8 + 'rent')
$content = $content.Replace('pages axe sur des ecritures fluides inspirees', 'pages ax' + [char]0xe9 + ' sur des ' + [char]0xe9 + 'critures fluides inspir' + [char]0xe9 + 'es')
$content = $content.Replace('calligraphie structuree', 'calligraphie structur' + [char]0xe9 + 'e')
$content = $content.Replace('liberte creative', 'libert' + [char]0xe9 + ' cr' + [char]0xe9 + 'ative')

# Beach product card
$content = $content.Replace('Ecritures fluides', [char]0xc9 + 'critures fluides')
$content = $content.Replace('elements decoratifs et mises en page creatives', [char]0xe9 + 'l' + [char]0xe9 + 'ments d' + [char]0xe9 + 'coratifs et mises en page cr' + [char]0xe9 + 'atives')

# Amy Latta paragraph
$content = $content.Replace('projets creatifs en parallele du developpement des competences', 'projets cr' + [char]0xe9 + 'atifs en parall' + [char]0xe8 + 'le du d' + [char]0xe9 + 'veloppement des comp' + [char]0xe9 + 'tences')
$content = $content.Replace("les cartes de voeux, les etiquettes", "les cartes de v" + [char]0x153 + "ux, les " + [char]0xe9 + "tiquettes")
$content = $content.Replace('nouvelles competences a de', 'nouvelles comp' + [char]0xe9 + 'tences ' + [char]0xe0 + ' de')

# Western paragraph
$content = $content.Replace("de l'ecriture", "de l'" + [char]0xe9 + "criture")
$content = $content.Replace("les cahiers a theme Western de Loopinky se demarquent", "les cahiers " + [char]0xe0 + " th" + [char]0xe8 + "me Western de Loopinky se d" + [char]0xe9 + "marquent")
$content = $content.Replace("L'edition", "L'" + [char]0xe9 + "dition")
$content = $content.Replace("inspires de la frontiere", "inspir" + [char]0xe9 + "s de la fronti" + [char]0xe8 + "re")
$content = $content.Replace("variations elegantes et feminines", "variations " + [char]0xe9 + "l" + [char]0xe9 + "gantes et f" + [char]0xe9 + "minines")
$content = $content.Replace("des elements decoratifs et des mots de pratique a theme", "des " + [char]0xe9 + "l" + [char]0xe9 + "ments d" + [char]0xe9 + "coratifs et des mots de pratique " + [char]0xe0 + " th" + [char]0xe8 + "me")

# Cowboy alt text
$content = $content.Replace("Cahier d'Ecriture", "Cahier d'" + [char]0xc9 + "criture")

# Table header
$content = $content.Replace('Ideal pour', 'Id' + [char]0xe9 + 'al pour')

# Table - elegant
$content = $content.Replace('lettering elegant', 'lettering ' + [char]0xe9 + 'l' + [char]0xe9 + 'gant')

# Table - creatifs
$content = $content.Replace('Projets creatifs', 'Projets cr' + [char]0xe9 + 'atifs')

# Table - thematique
$content = $content.Replace('Cursive thematique', 'Cursive th' + [char]0xe9 + 'matique')

# How to choose
$content = $content.Replace('calligraphie depend', 'calligraphie d' + [char]0xe9 + 'pend')

# Bullet - creatifs
$content = $content.Replace('projets creatifs', 'projets cr' + [char]0xe9 + 'atifs')

# Bullet - thematique
$content = $content.Replace('cursive thematique', 'cursive th' + [char]0xe9 + 'matique')

# Bullet - variete and differents
$content = $content.Replace('maximum de variete', 'maximum de vari' + [char]0xe9 + 't' + [char]0xe9)
$content = $content.Replace('cahiers differents', 'cahiers diff' + [char]0xe9 + 'rents')

# Blockquote
$content = $content.Replace('commencer a pratiquer', 'commencer ' + [char]0xe0 + ' pratiquer')
$content = $content.Replace('Vous serez etonne', 'Vous serez ' + [char]0xe9 + 'tonn' + [char]0xe9)
$content = $content.Replace("vos progres apres", "vos progr" + [char]0xe8 + "s apr" + [char]0xe8 + "s")

# Ou Acheter heading
$content = $content.Replace('>Ou Acheter<', '>' + [char]0xd2 + 'u Acheter<')
$content = $content.Replace('cahiers mentionnes', 'cahiers mentionn' + [char]0xe9 + 's')

# Final CTA paragraph
$content = $content.Replace('Pret a commencer', 'Pr' + [char]0xea + 't ' + [char]0xe0 + ' commencer')
$content = $content.Replace('collection complete', 'collection compl' + [char]0xe8 + 'te')

# Related articles
$content = $content.Replace('Articles Associes', 'Articles Associ' + [char]0xe9 + 's')
$content = $content.Replace('Comment Debuter', 'Comment D' + [char]0xe9 + 'buter')
$content = $content.Replace('pour debutants sur', 'pour d' + [char]0xe9 + 'butants sur')
$content = $content.Replace('Maitrisez', 'Ma' + [char]0xee + 'trisez')

# Footer
$content = $content.Replace('droits reserves', 'droits r' + [char]0xe9 + 'serv' + [char]0xe9 + 's')
$content = $content.Replace('Mentions legales', 'Mentions l' + [char]0xe9 + 'gales')

# Fix the Ou with correct accent (should be capital O with grave)
$content = $content.Replace([char]0xd2 + 'u Acheter', [char]0xd2 + 'u Acheter')

# Write the file
[System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
Write-Host "Done - all accents fixed"
