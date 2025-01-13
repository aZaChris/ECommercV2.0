# Script per automatizzare git commit e push

# Colori per output
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Red = [System.ConsoleColor]::Red

# Mostra stato corrente
Write-Host "`nStato attuale del repository:" -ForegroundColor $Yellow
git status

# Chiedi il messaggio di commit
Write-Host "`nInserisci il messaggio di commit:" -ForegroundColor $Green
$commitMessage = Read-Host

if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    Write-Host "`nErrore: Il messaggio di commit non può essere vuoto!" -ForegroundColor $Red
    exit 1
}

# Esegui add, commit e push
try {
    Write-Host "`nAggiunta dei file modificati..." -ForegroundColor $Yellow
    git add .
    
    Write-Host "`nCreazione del commit..." -ForegroundColor $Yellow
    git commit -m "$commitMessage"
    
    Write-Host "`nPush in corso..." -ForegroundColor $Yellow
    git push origin main
    
    Write-Host "`nOperazione completata con successo!" -ForegroundColor $Green
    Write-Host "Messaggio commit: $commitMessage`n" -ForegroundColor $Green
}
catch {
    Write-Host "`nErrore durante l'operazione: $_" -ForegroundColor $Red
    exit 1
}
