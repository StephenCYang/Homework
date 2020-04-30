# First we'll import the os module
# This will allow us to create file paths across operating systems
import os

# Module for reading CSV files
import csv

# Module for statistics, since I want to use the mean function.
import statistics

# Variables
csvpath = 'budget_data.csv'                 # Set filename.
MonthCount = 0                              # Initialize the number of months to zero
TotalPL = 0                                 # Initialize Total Profit/Loss to zero
GreatestIncreaseAmt = 0                     # Initialize the Greatest Increase Amount
GreatestDecreaseAmt = 0                     # Initialize the Greatest Decrease Amount
PL_list = []                                # list of all profit/loss amounts
Difference = 0                              # The difference between current and previous month
Previous_Month = 0                          # P/L of the previous month.


# This is how we traverse the file.
with open(csvpath) as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')
    
    # Read the header row first, but don't do anything with it. 
    csv_header = next(csvreader)

    # Read each row of data after the header
    for row in csvreader:

        MonthCount += 1             # Add 1 to the count of Months.
        MonthYear = row[0]          # Fetch the date
        ProfitLoss = int(row[1])    # Fetch the profit/loss and convert to a number
        TotalPL += ProfitLoss       # Accumulate the total profit/loss

        # How much did this month's PL change vs the previous month?
        # If we're looking at the very first month, skip it.
        
        if MonthCount > 1:
            Difference = ProfitLoss - Previous_Month
            PL_list.append(Difference)  # Add the current month's difference to the list

        # Is this the greatest increase? Skip if we're at the first month.

        if (MonthCount > 1) & (Difference > GreatestIncreaseAmt):
            GreatestIncreaseAmt = Difference
            GreatestIncreaseDate = MonthYear

        # Is this the greatest decrease? Skip if we're at the first month.

        if (MonthCount > 1) & (Difference < GreatestDecreaseAmt):
            GreatestDecreaseAmt = Difference
            GreatestDecreaseDate = MonthYear

        # Set the current month's P/L to the new previous month

        Previous_Month = ProfitLoss

    # Get the mean of all the monthly differences.

    AverageChange = statistics.mean(PL_list)

    print('\n')
    print(PL_list)    

# Here we print the report to the console

    print('\nFinancial Analysis')
    print('----------------------------')
    print('Total Months: ' + str(MonthCount))
    print('Total: $' + str(TotalPL))
    print('Average Change: $' + str(format(AverageChange,".2f")))
    print('Greatest Increase in Profits: '+ GreatestIncreaseDate + ' ($' + str(GreatestIncreaseAmt) + ')')
    print('Greatest Decrease in Profits: '+ GreatestDecreaseDate + ' ($' + str(GreatestDecreaseAmt) + ')\n')

# Here we write to the file, results.txt

    f = open("results.txt", "w")    # Create, if it doesn't exist.

    f.write('Financial Analysis\n')
    f.write('----------------------------\n')
    f.write('Total Months: ' + str(MonthCount) + '\n')
    f.write('Total: $' + str(TotalPL) + '\n')
    f.write('Average Change: $' + str(format(AverageChange,".2f")) + ' \n')
    f.write('Greatest Increase in Profits: '+ GreatestIncreaseDate + ' ($' + str(GreatestIncreaseAmt) + ')\n')
    f.write('Greatest Decrease in Profits: '+ GreatestDecreaseDate + ' ($' + str(GreatestDecreaseAmt) + ')\n')
    
    f.close

# Done!




