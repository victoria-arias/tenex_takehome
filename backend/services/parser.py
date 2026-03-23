# convert raw log text into structured records as a Pandas DataFrame
import re
import pandas as pd

# Identify log fields
LOG_PATTERN = re.compile(
    r'(?P<ip>\S+) \S+ \S+ \[(?P<timestamp>[^\]]+)\] '
    r'"(?P<method>\S+) (?P<endpoint>\S+) \S+" '
    r'(?P<status_code>\d{3}) (?P<bytes>\S+)'
)

# Read and parse log files
def parse_log_file(file_path: str) -> pd.DataFrame:
    records = []

    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            match = LOG_PATTERN.match(line.strip())
            if match:
                records.append(match.groupdict())

    # Create DataFrame
    df = pd.DataFrame(records)

    if df.empty:
        return df

    # --- Clean / convert types ---

    # Convert timestamp
    df["timestamp"] = pd.to_datetime(
        df["timestamp"],
        format="%d/%b/%Y:%H:%M:%S %z",
        errors="coerce"
    )

    # Convert numeric fields
    df["status_code"] = pd.to_numeric(df["status_code"], errors="coerce")
    df["bytes"] = pd.to_numeric(df["bytes"], errors="coerce").fillna(0)

    # Optional: sort by time
    df = df.sort_values("timestamp")

    return df