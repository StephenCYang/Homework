# our task is to create a Python script that analyzes the records to calculate each of the following:
#1. The total number of months included in the dataset
#The net total amount of "Profit/Losses" over the entire period
#The average of the changes in "Profit/Losses" over the entire period
#The greatest increase in profits (date and amount) over the entire period
#The greatest decrease in losses (date and amount) over the entire period
#As an example, your analysis should look similar to the one below:
# open csv file on python, read it 
import os
import csv
file_path = os.path.join("..", "python-challenge","budget_data.csv")
with open(budgetdata.csv) as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ",")
date,profit_and_losses=[],[]
#For Row in csv reader 
For row in csvreader
    current_row = current_row + 1
    # 1. count number of rows using len function. 
    
    months= len(list(csvreader))  OR 
    months = 0
    
    for row in csvreader:
        months += 1
    
        #create variable for profit and losses. column2 = profit_and_losses 
        profit_and_losses = []
        
        for row in csvreader:
            profit_and_losses.append([row[1]])
            #calculate the result of all profit and losses (2nd column, as indicated by delimiter)
        profit_and_losses = profit_and_losses + 1 
        # Get sum of each row. 
    for row in csvreader:
        total += int(row[1])



    print total
# Continuing the for loop (indented), find the average of profit/losses overtime. to do this, use the result above
# and divide by the number of rows.
# sum/len
for row in reader:
    profit_and_losses = (row[1])
    profit_and_losses_sum = sum(profit_and_losses)
    profit_and_losses_length = len(profit_and_losses)
    profit_and_losses_average = profit_and_losses_sum / profit_and_losses_length
 #Print results. 
# Continue for loop. Traverse profit losses and find the greatest increase (highest number). max
maxnum = max(csvreader, key=lambda row: int(row[1]))
minnum = min(csvreader, key=lambda row: int(row[1]))
# Create variable for current_greatest_increase
If current_row > current_greatest_increase, then 
current_row = current_greatest_increase. 
 
# Continue for loop. Traverse profit and losses and find the greatest decrease (lowest number). min
# Create variable for current_greatest_decrease
If current_row < current_greatest_decrease, then 
current_row = current_greatest_decrease. 
#Print results of current_row. 
print("otal Months:" + months)
print("Total:" + profit_and_losses_sum)
print("Average Change:" + profit_and_losses_average)
print("Greatest Increase in Profits:" + maxnum)
print("Greatest Decrease in Profits:" + minnum)