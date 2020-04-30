# PyPoll project, but using Pandas.

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
import pandas as pd
import os

# Variables:
CSVSourceFile = 'election_data.csv'
OutputFile = 'results-pandas.txt'
Winner = "Nobody"
WinnerVotes = 0
list_of_candidates = []

# stuff happens here

# Read in the recorded votes
votes_df = pd.read_csv(CSVSourceFile,delimiter=',',header=0)

# We don't care about Voter ID or County, so let's get rid of them.
Cleaned_votes_df = votes_df.drop(['Voter ID','County'], axis=1)

# Get the total number of votes from shape.
TotalVotes = Cleaned_votes_df.shape[0]

# Get the unique candidate names into a list
list_of_candidates = Cleaned_votes_df["Candidate"].unique().tolist()

# Output report

# Header
print('\nElection Results')
print('-------------------------')
print('Total Votes: ' + str(TotalVotes))
print('-------------------------')

# Tabulation
for Name in list_of_candidates:

    # Get the number of times the current name shows up in the dataframe. We don't have to count ourselves.
    CandidateVotes = Cleaned_votes_df[Cleaned_votes_df['Candidate'] == Name].shape[0]

    # Calculate the Percentage of Votes.
    PercentageVotes = CandidateVotes / TotalVotes * 100

    # Figure out who is winning.
    if WinnerVotes < CandidateVotes:
        WinnerVotes = CandidateVotes
        Winner = Name

    print(Name + ': ' + '{:.3f}'.format(PercentageVotes) + '% (' + str(CandidateVotes) + ')')
        
print('-------------------------')
print('Winner: ' + Winner)
print('-------------------------\n')
    

# Same report, but to a file.
# didn't use Pandas here since I'm just writing a report, not a csv or any sort of dataframe.
f = open(OutputFile, "w")   # Create, if doesn't exist.

f.write('Election Results\n')
f.write('-------------------------\n')
f.write('Total Votes: ' + str(TotalVotes) + '\n')
f.write('-------------------------\n')

# Recount, since I didn't bother saving each candidate's results.

for Name in list_of_candidates:
    CandidateVotes = Cleaned_votes_df[Cleaned_votes_df['Candidate'] == Name].shape[0]
    PercentageVotes = CandidateVotes / TotalVotes * 100
    f.write(Name + ': ' + '{:.3f}'.format(PercentageVotes) + '% (' + str(CandidateVotes) + ')\n')
    
    # We're reusing the previous Winner info since that won't change.
    
f.write('-------------------------\n')
f.write('Winner: ' + Winner + '\n')
f.write('-------------------------\n')

f.close