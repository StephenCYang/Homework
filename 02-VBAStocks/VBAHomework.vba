Sub VBAHomework()

' Create a script that will loop through all the stocks for one year and output
' the following information.

' - The ticker symbol.
' - Yearly change from opening price at the beginning of a given year to the
'   closing price at the end of that year.
' - The percent change from opening price at the beginning of a given year to
'   the closing price at the end of that year.
' - The total stock volume of the stock.
' - You should also have conditional formatting that will highlight positive
'   change in green and negative change in red.


' get the last row. This block of code was something I found online.
' *** Replaced with a While loop. ***
'Dim lRow As Long
    
'    On Error Resume Next
'    lRow = Cells.Find(What:="*", _
'                    After:=Range("A1"), _
'                    LookAt:=xlPart, _
'                    LookIn:=xlFormulas, _
'                    SearchOrder:=xlByRows, _
'                    SearchDirection:=xlPrevious, _
'                    MatchCase:=False).Row
'    On Error GoTo 0
    
'    MsgBox "Last Row: " & lRow

' The following code is all mine.

' Initialize some variables

' Assuming row 1 is headers, set the beginning result row to 2.
CurrentOutputRow = 2

' Set the initial opening price for the first record from column 3 (aka C).
OpeningPrice = Cells(2, 3)
' MsgBox (OpeningPrice)

' Initialize the TotalStockVolume to 0
TotalStockVolume = 0

' Initialize Greatest % Increase variables
GreatestIncreaseTicker = ""
GreatestIncreasePercentage = 0

' Initialize Greatest % Decrease variables
GreatestDecreaseTicker = ""
GreatestDecreasePercentage = 0

' Initialize GreatestVolume variables
GreatestVolumeTicker = ""
GreatestVolumeTotal = 0

' Headers and legends
Range("j1") = "Ticker"
Range("k1") = "Yearly Change"
Range("L1") = "Percent Change"
Range("M1") = "Total Stock Volume"
Range("Q1") = "Ticker"
Range("R1") = "Value"

Range("P2") = "Greatest % Increase"
Range("P3") = "Greatest % Decrease"
Range("P4") = "Greatest Total Volume"

' Uncomment for debugging.
'Range("n1") = "First Opening Price"
'Range("o1") = "Final Closing Price"

' This assumes all ticker names are sorted by ticker name and date.

' *** The for-next loop is replaced by a While loop. ***
' For i = 2 To lRow

' Are we at the end of the table?
' Start from row 2
i = 2

While Cells(i, 1) <> ""

    ' Check to see if the ticker name changes.
    If (Cells(i, 1) <> Cells(i + 1, 1)) Then
        ' If the names don't match, it's a new stock.
    
            ' write these out the Ticker name
            Cells(CurrentOutputRow, 10) = Cells(i, 1)
            
            ' get the closing price from column 6 (aka F).
            ClosingPrice = Cells(i, 6)
        
            ' Calculate the change in price
            ChangeInPrice = ClosingPrice - OpeningPrice
        
            ' Set the cell color. Positive is Green, Negative is Red, 0 is no change.
            If ChangeInPrice > 0 Then
                Cells(CurrentOutputRow, 11).Interior.ColorIndex = 4
            ElseIf ChangeInPrice < 0 Then
                Cells(CurrentOutputRow, 11).Interior.ColorIndex = 3
            Else
                Cells(CurrentOutputRow, 11).Interior.ColorIndex = 0
            End If
        
            ' write the change to column 11.
            Cells(CurrentOutputRow, 11) = ChangeInPrice
        
            ' Calc percentage change. Check for 0 value to avoid Range errors.
            If OpeningPrice > 0 Then
                PercentChange = ChangeInPrice / OpeningPrice
            Else
                PercentChange = 0
            End If
            
            
            ' Write the percent change to column 12 (aka L) in percent format.
            Cells(CurrentOutputRow, 12) = Format(PercentChange, "Percent")
        
            ' Write the total stock volume
            Cells(CurrentOutputRow, 13) = TotalStockVolume
       
            ' For debugging, we'll write out the first opening price and last closing price.
            'Cells(CurrentOutputRow, 14) = OpeningPrice
            'Cells(CurrentOutputRow, 15) = ClosingPrice
        
            ' Check for Greatest Increase
            If PercentChange > GreatestIncreasePercentage Then
                GreatestIncreasePercentage = PercentChange
                GreatestIncreaseTicker = Cells(i, 1)
            End If
        
            ' Check for Greatest Decrease
            If PercentChange < GreatestDecreasePercentage Then
                GreatestDecreasePercentage = PercentChange
                GreatestDecreaseTicker = Cells(i, 1)
            End If
        
            ' Check for Greatest Volume
            If TotalStockVolume > GreatestVolumeTotal Then
                GreatestVolumeTotal = TotalStockVolume
                GreatestVolumeTicker = Cells(i, 1)
            End If
        
            ' Reset the TotalStockVolume
            TotalStockVolume = 0
        
            ' Get the next OpeningPrice
                        
            NxtOpeningPriceLine = (i + 1)
            OpeningPrice = Cells(NxtOpeningPriceLine, 3)
                        
            ' Basically, if the next opening price is 0, and that we haven't reached the end of the table,
            ' and the ticker name hasn't changed, we check the line after it.
            
            While ((OpeningPrice = 0) And (Cells(NxtOpeningPriceLine, 1) <> "") And (Cells(NxtOpeningPriceLine, 1) = Cells(NxtOpeningPriceLine + 1, 1)))
                NxtOpeningPriceLine = NxtOpeningPriceLine + 1
                OpeningPrice = Cells(NxtOpeningPriceLine, 3)
                
                ' The following was a good debug msg, but way too many!!
                ' MsgBox (Str(NxtOpeningPriceLine) + " " + Str(OpeningPrice))
            Wend
                        
            ' Iterate the current output row
            CurrentOutputRow = CurrentOutputRow + 1
        
        End If
    
        ' Else we accumulate the stock volume from column 7 (aka G) starting with the next row.
        TotalStockVolume = TotalStockVolume + Cells(i + 1, 7)
    
' *** The for-next loop is replaced by the while loop. ***
' Next i

' Increment the row number we're looking at.
i = i + 1
Wend
    
' Write the Greatests
Range("q2") = GreatestIncreaseTicker
Range("r2") = Format(GreatestIncreasePercentage, "Percent")
Range("q3") = GreatestDecreaseTicker
Range("r3") = Format(GreatestDecreasePercentage, "Percent")
Range("q4") = GreatestVolumeTicker
Range("r4") = GreatestVolumeTotal

MsgBox ("Completed!")

End Sub


