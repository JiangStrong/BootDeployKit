param(
    [Parameter(Position = 0)]
    [ValidateSet("list", "use", "current", "home")]
    [string]$Command = "current",

    [Parameter(Position = 1)]
    [string]$Version
)

$Root = Join-Path $env:USERPROFILE "mvnvm"
$Versions = Join-Path $Root "versions"
$Current = Join-Path $Root "current"

function Get-MavenHome([string]$SelectedVersion) {
    Join-Path $Versions $SelectedVersion
}

switch ($Command) {
    "list" {
        if (-not (Test-Path $Versions)) {
            Write-Host "No Maven versions installed."
            exit 0
        }
        Get-ChildItem $Versions -Directory | ForEach-Object {
            $marker = ""
            if ((Test-Path $Current) -and ((Get-Item $Current).Target -contains $_.FullName)) {
                $marker = "* "
            }
            Write-Host "$marker$($_.Name)"
        }
    }
    "use" {
        if (-not $Version) {
            Write-Error "Usage: mvnvm use <version>"
            exit 1
        }
        $target = Get-MavenHome $Version
        if (-not (Test-Path $target)) {
            Write-Error "Maven $Version is not installed at $target"
            exit 1
        }
        if (Test-Path $Current) {
            Remove-Item $Current -Force
        }
        cmd /c mklink /J "$Current" "$target" | Out-Null
        Write-Host "Now using Maven $Version"
        Write-Host "Open a new terminal or ensure $Current\bin is on PATH."
    }
    "home" {
        Write-Host $Current
    }
    "current" {
        if (Test-Path (Join-Path $Current "bin\mvn.cmd")) {
            & (Join-Path $Current "bin\mvn.cmd") -v
        } else {
            Write-Host "No Maven version selected."
        }
    }
}
