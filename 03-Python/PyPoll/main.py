# PyPoll

# The input data file looks like this:

# Voter ID,County,Candidate
# 12864552,Marsh,Khan
# 17444633,Marsh,Correy
# 19330107,Marsh,Khan
# 19865775,Queen,Khan

# The report should list:
# - The total number of votes cast
# - A complete list of candidates who received votes
# - The percentage of votes each candidate won
# - The total number of votes each candidate won
# - The winner of the election based on popular vote.

# Our includes:
import os
import csv

# Variables:
CSVSourceFile = 'election_data.csv' # name of the file we're reading in.
OutputFile = 'results.txt'          # name of the file we're writing results to
Votes = []                          # A list of all the votes
TotalVotes = 0                      # Total number of votes cast
CandidateVotes = 0                  # Count of how many votes a candidate received
Winner = "Nobody"                   # The current leading candidate/winner name
WinnerVotes = 0                     # The current leading candidate/winner votes
list_of_candidates = []             # List of UNIQUE candidate names

# stuff happens here

with open(CSVSourceFile) as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=",")
    
    # Read in the header, but we don't do anything with it.
    csv_header = next(csvreader)
    
    # Basically, we're just counting how many times a candidate name shows up.
    # So let's just throw each name into the list, and then do a Count().
    
    # Throw all the names into the list.
    for row in csvreader:
        CandidateName = row[2]
        Votes.append(CandidateName)
                
        # Running total
        TotalVotes += 1

        # Create another list of unique Candidate names

        if list_of_candidates.count(CandidateName) == 0:
            list_of_candidates.append(CandidateName)

# Output report

# Header
print('\nElection Results')
print('-------------------------')
print('Total Votes: ' + str(TotalVotes))
print('-------------------------')

# Tabulation
for name in list_of_candidates:

    # Count the number of times the current name shows up in the list.
    CandidateVotes = Votes.count(name)

    # Calculate the Percentage of Votes.
    PercentageVotes = CandidateVotes/TotalVotes * 100
    
    # Figure out who is winning
    if WinnerVotes < CandidateVotes:
        WinnerVotes = CandidateVotes
        Winner = name
    
    print(name + ': ' + '{:.3f}'.format(PercentageVotes) + '% (' + str(CandidateVotes) + ')')

print('-------------------------')
print('Winner: ' + Winner)
print('-------------------------\n')

# Write out the same thing to a file.

f = open(OutputFile, "w")       # Create, if doesn't exist. 

# Header
f.write('Election Results\n')
f.write('-------------------------\n')
f.write('Total Votes: ' + str(TotalVotes) + '\n')
f.write('-------------------------\n')

# Tabulation
for name in list_of_candidates:

    # Count the names again, since we were too lazy to save these.
    CandidateVotes = Votes.count(name)
    # Calculate Percentage of Votes again (since we're not bothering to save it.)
    PercentageVotes = CandidateVotes/TotalVotes * 100
    
    f.write(name + ': ' + '{:.3f}'.format(PercentageVotes) + '% (' + str(CandidateVotes) + ')\n')

    # We don't need to figure out the winner again. We'll just use the existing values.

f.write('-------------------------\n')
f.write('Winner: ' + Winner + '\n')
f.write('-------------------------\n')

f.close

