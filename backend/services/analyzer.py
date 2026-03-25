# generate summary stats and timeline
def analyze_logs(df):

    if df.empty:
        return {}

    summary = {
        "total_requests": len(df),
        "unique_ips": df["ip"].nunique(),
        "error_count": (df["status_code"] >= 400).sum()
    }

    top_ips = (
        df["ip"]
        .value_counts()
        .head(5)
        .reset_index()
        .rename(columns={"index": "ip", "ip": "count"})
        .to_dict(orient="records")
    )

    top_endpoints = (
        df["endpoint"]
        .value_counts()
        .head(5)
        .reset_index()
        .rename(columns={"index": "endpoint", "endpoint": "count"})
        .to_dict(orient="records")
    )

    timeline = (
        df.sort_values("timestamp")
        .head(50)
        .assign(
            event=lambda x: (
                x["method"] + " " +
                x["endpoint"] +
                " from " +
                x["ip"] +
                " returned " +
                x["status_code"].astype(str)
            )
        )[["timestamp", "event"]]
        .to_dict(orient="records")
    )

    return {
        "summary": summary,
        "top_ips": top_ips,
        "top_endpoints": top_endpoints,
        "timeline": timeline
    }