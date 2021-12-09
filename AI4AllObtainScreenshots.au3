#cs ----------------------------------------------------------------------------

 AutoIt Version: 3.3.14.2
 Author:         Roman Kuskov

 Script Function:
   Monitors requests from AI4AllDetector application and takes screenshots from web-cameras by the given URL.

#ce ----------------------------------------------------------------------------

#include <Array.au3>
#include <File.au3>
#include <ScreenCapture.au3>

Global Const $SLEEP_INTERVAL_SECS = 1
Global Const $WAIT_BROWSER_OPEN_SECS = 20

Global Const $FIREFOX_HANDLE_SEARCH_STRING = "[REGEXPTITLE: - Mozilla Firefox$;REGEXPCLASS:Mozilla(UI)?WindowClass]"
Global Const $COORD_LEFT = 155
Global Const $COORD_TOP = 130
Global Const $COORD_RIGHT = 3700
Global Const $COORD_BOTTOM = 1990

; These three constants must be synchronized with AI4AllDetector app.
Global const $ROOT_DIR = "S:\xproject\ai4all\ScreenshotRequests"
Global Const $URL_FILE_NAME = "input_url"
Global Const $SCREENSHOT_FILE_NAME = "screenshot.png"

Main()

Func TakeAndSaveScreenshot($url, $screenshotFile)
   ConsoleWrite("Begin taking the screenshot by URL '" & $url & "'..." & @CRLF)
   ShellExecute($url)
   Sleep($WAIT_BROWSER_OPEN_SECS * 1000)

   WinWait($FIREFOX_HANDLE_SEARCH_STRING, "", $WAIT_BROWSER_OPEN_SECS)
   Local $handleBrowser = WinGetHandle($FIREFOX_HANDLE_SEARCH_STRING)

   Local $img = _ScreenCapture_CaptureWnd($screenshotFile, $handleBrowser, $COORD_LEFT, $COORD_TOP, $COORD_RIGHT, $COORD_BOTTOM, false)
   _WinAPI_DeleteObject($img)
   WinClose($handleBrowser)
   ConsoleWrite("The screenshot has been taken" &  @CRLF)
EndFunc

; Returns URL to get screenshot by or empty string if failed to get it
Func ReadInputUrl($urlFile)
   Local $url = ""
   If FileExists($urlFile) Then
	  ; open for writing to get exclusive lock
	  Local $handleUrlFile = FileOpen($urlFile, $FO_APPEND)
	  If $handleUrlFile <> -1 Then
		 FileSetPos($handleUrlFile, 0, $FILE_BEGIN)
		 $url = FileRead($handleUrlFile)
		 FileClose($handleUrlFile)
	  EndIf
   EndIf
   Return $url
EndFunc

Func ProcessRequests()
   Local $aRequestDirs = _FileListToArray($ROOT_DIR, "id*", $FLTA_FOLDERS)
   If @error = 1 Then
      ConsoleWrite("Cannot get requests subdirs: ROOT_DIR is invalid: " & $ROOT_DIR)
	  Return
   EndIf
   If @error = 4 Then
	  ConsoleWrite("No requests were found.")
      Return
    EndIf

   ; 0's index stores the count of found subdirs
   For $i = 1 To $aRequestDirs[0]
	  Local $fullRequestDir = $ROOT_DIR & "\" & $aRequestDirs[$i]
	  Local $urlFile = $fullRequestDir & "\" & $URL_FILE_NAME
	  Local $url = ReadInputUrl($urlFile)
	  if $url <> "" Then
		 ; delete the file to avoid getting the screenshot for the second time
		 FileDelete($urlFile)
		 TakeAndSaveScreenshot($url, $fullRequestDir & "\" & $SCREENSHOT_FILE_NAME)
	  EndIf
   Next
EndFunc

Func Terminate()
	Exit
EndFunc

Func Main()
   HotKeySet("{PAUSE}", "Terminate")

   While 1
	  ProcessRequests()
	  Sleep($SLEEP_INTERVAL_SECS * 1000)
   WEnd
EndFunc
