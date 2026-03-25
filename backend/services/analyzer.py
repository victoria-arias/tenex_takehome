# generate summary stats and timeline
def analyze_logs(df):

    if df.empty:
        return {
            "summary": {
                "total_requests": 0,
                "unique_ips": 0,
                "error_count": 0
            },
            "top_ips": [],
            "top_endpoints": [],
            "timeline": [],
            "request_rate_over_time": []
        }

    summary = {
        "total_requests": int(len(df)),
        "unique_ips": int(df["ip"].nunique()),
        "error_count": int((df["status_code"] >= 400).sum())
    }

    top_ips_df = (
        df["ip"]
        .value_counts()
        .head(5)
        .rename_axis("ip")
        .reset_index(name="count")
    )

    top_ips = [
        {
            "ip": row["ip"],
            "count": int(row["count"])
        }
        for _, row in top_ips_df.iterrows()
    ]

    top_endpoints_df = (
        df["endpoint"]
        .value_counts()
        .head(5)
        .rename_axis("endpoint")
        .reset_index(name="count")
    )

    top_endpoints = [
        {
            "endpoint": row["endpoint"],
            "count": int(row["count"])
        }
        for _, row in top_endpoints_df.iterrows()
    ]

    timeline_df = (
        df.sort_values("timestamp")
        .head(50)
        .copy()
    )

    timeline_df["event"] = (
        timeline_df["method"] + " " +
        timeline_df["endpoint"] +
        " from " +
        timeline_df["ip"] +
        " returned " +
        timeline_df["status_code"].astype(int).astype(str)
    )

    timeline = [
        {
            "timestamp": row["timestamp"].isoformat(),
            "event": row["event"]
        }
        for _, row in timeline_df.iterrows()
    ]

    rate_df = (
        df.set_index("timestamp")
        .resample("1min")
        .size()
        .reset_index(name="request_count")
    )

    request_rate_over_time = [
        {
            "timestamp": row["timestamp"].isoformat(),
            "request_count": int(row["request_count"])
        }
        for _, row in rate_df.iterrows()
    ]

    return {
        "summary": summary,
        "top_ips": top_ips,
        "top_endpoints": top_endpoints,
        "timeline": timeline,
        "request_rate_over_time": request_rate_over_time
    }