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
import statistics

profit_and_losses = []              # *** moved here, since you don't want to reinitialize it every loop. ***
Total_PL = 0
date = []
months = 0                          # *** moved here, otherwise you'd be zero'ing it out every row.
prev_month = 0
difference = 0
difference_list = []
total_diff = 0
greatest_decrease = 0
greatest_increase = 0

file_path = os.path.join("..", "python-challenge","budget_data.csv")

with open('budget_data.csv') as csvfile:
#with open(file_path) as csvfile:      
    csvreader = csv.reader(csvfile, delimiter = ",")

    # read the header, but don't do anything with it.
    csv_header = next(csvreader)

    #For Row in csv reader 
    for row in csvreader:
        #current_row = current_row + 1
 
        months += 1

        #create variable for profit and losses. column2 = profit_and_losses

        current_pl = int(row[1])
        
        profit_and_losses.append(current_pl)

        #calculate the result of all profit and losses
        Total_PL = Total_PL + current_pl

        
        if months > 1:
            difference =  current_pl - prev_month
            difference_list.append(difference)
            total_diff = total_diff + difference


        # greatest increase

        if (months > 1) & (difference > greatest_increase):
            greatest_increase = difference
            greatest_increase_month = row[0]

        # greatest dec

        if (months > 1) & (difference < greatest_decrease):
            greatest_decrease = difference
            greatest_decrease_month = row[0]


        prev_month = current_pl
            
    
print('\n')
print(months)
print(Total_PL)
#print(profit_and_losses)
# print(difference_list)
# calc the average difference
average_change = statistics.mean(difference_list)

print(average_change)
#print(greatest_increase, greatest_decrease)
print(greatest_increase_month, greatest_increase)
print(greatest_decrease_month,greatest_decrease)
print('\n')


# Continuing the for loop (indented), find the average of profit/losses overtime. to do this, use the result above
# and divide by the number of rows.
# sum/len
#    profit_and_losses = (row[1])    # *** this is okay.   
    
    #profit_and_losses_sum = sum(profit_and_losses) # *** this doesn't need to be executed for each row you loop thorough.


# *** This calculation isn't right. It should be the average month-to-month difference.
#    profit_and_losses_length = len(profit_and_losses)
#   profit_and_losses_average = profit_and_losses_sum / profit_and_losses_length


 #Print results. 


# *** I think the idea of using a min() and max() function here would work. Just need to get the syntax right.

# Continue for loop. Traverse profit losses and find the greatest increase (highest number). max
#    maxnum = max(csvreader, key=lambda row: int(row[1]))
    #minnum = min(csvreader, key=lambda row: int(row[1]))
# Create variable for current_greatest_increase
    #if current_row > current_greatest_increase, then 
    #current_row = current_greatest_increase. 
 

# Continue for loop. Traverse profit and losses and find the greatest decrease (lowest number). min
# Create variable for current_greatest_decrease
#    if current_row < current_greatest_decrease, then 
    #current_row = current_greatest_decrease. 
#Print results of current_row. 

#print("Total Months:" + months)
#print("Total:" + profit_and_losses_sum)
#print("Average Change:" + profit_and_losses_average) # *** gotta fix this calcuation above.
#print("Greatest Increase in Profits:" + maxnum)
#print("Greatest Decrease in Profits:" + minnum)