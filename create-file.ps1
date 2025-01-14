# Script PowerShell per creare file nelle directory appropriate

# Funzione per ottenere il nome del file
function Get-FileName {
    $fileName = Read-Host "Inserisci il nome del file (senza estensione)"
    return $fileName
}

# Funzione per mostrare il menu e ottenere la scelta
function Show-Menu {
    Write-Host "`n=== Seleziona il tipo di file ==="
    Write-Host "1. CSS"
    Write-Host "2. JavaScript"
    Write-Host "3. HTML"
    Write-Host "4. Esci"
    
    do {
        $choice = Read-Host "`nInserisci il numero della tua scelta (1-4)"
    } while ($choice -notmatch '^[1-4]$')
    
    return $choice
}

# Funzione per creare un singolo file
function Create-SingleFile {
    param (
        [string]$fileName,
        [string]$choice
    )
    
    # Definisci le directory per ogni tipo di file
    $directories = @{
        "1" = ".\css"
        "2" = ".\js"
        "3" = "."
    }
    
    # Definisci le estensioni per ogni tipo di file
    $extensions = @{
        "1" = ".css"
        "2" = ".js"
        "3" = ".html"
    }
    
    # Seleziona directory ed estensione in base alla scelta
    $targetDir = $directories[$choice]
    $extension = $extensions[$choice]
    
    # Verifica se la directory esiste, altrimenti creala
    if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir
        Write-Host "`nCreata directory: $targetDir"
    }
    
    # Percorso completo del file
    $fullPath = Join-Path $targetDir ($fileName + $extension)
    
    # Verifica se il file esiste già
    if (Test-Path $fullPath) {
        Write-Host "`nATTENZIONE: Il file $fullPath esiste già!"
        $overwrite = Read-Host "Vuoi sovrascriverlo? (s/n)"
        if ($overwrite -ne "s") {
            Write-Host "Creazione file annullata."
            return
        }
    }
    
    # Crea il file
    try {
        New-Item -ItemType File -Path $fullPath -Force
        Write-Host "`nFile creato con successo: $fullPath"
    }
    catch {
        Write-Host "`nErrore durante la creazione del file: $_"
    }
}

# Funzione principale
function Create-Files {
    $fileName = Get-FileName
    $filesCreated = @()
    
    while ($true) {
        $choice = Show-Menu
        
        # Esci se l'utente seleziona 4
        if ($choice -eq "4") {
            break
        }
        
        # Verifica se il tipo di file è già stato creato
        if ($filesCreated -contains $choice) {
            Write-Host "`nHai già creato un file di questo tipo con il nome $fileName"
            $continue = Read-Host "Vuoi crearne un altro? (s/n)"
            if ($continue -ne "s") {
                continue
            }
        }
        
        Create-SingleFile -fileName $fileName -choice $choice
        $filesCreated += $choice
    }
    
    # Riepilogo finale
    if ($filesCreated.Count -gt 0) {
        Write-Host "`n=== Riepilogo ==="
        Write-Host "File creati con nome base '$fileName'"
        if ($filesCreated -contains "1") { Write-Host "- CSS" }
        if ($filesCreated -contains "2") { Write-Host "- JavaScript" }
        if ($filesCreated -contains "3") { Write-Host "- HTML" }
    }
    else {
        Write-Host "`nNessun file creato."
    }
}

# Esegui la funzione principale
Create-Files