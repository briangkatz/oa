import pandas as pd
infile = 'C:\\Workspace\\thesis\\boundaries\\watersheds_sensitivity.csv'
df = pd.read_csv(infile)
cols = list(df.columns)
fields_to_remove = ['STATES', 'NAME']
# fields_to_remove = ['HUC8', 'NAME']
for field in fields_to_remove:
    cols.remove(field)
for col in cols:
    col_zscore = col + '_zscore'
    df[col_zscore] = (df[col] - df[col].mean()) / df[col].std(ddof=0)
outfile = infile.replace('.csv', '_zscores.csv')
df.to_csv(outfile)
