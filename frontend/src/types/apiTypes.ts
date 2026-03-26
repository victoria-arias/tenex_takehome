export interface Summary {
  total_requests: number;
  unique_ips: number;
  error_count: number;
}

export interface TopIP {
  ip: string;
  count: number;
}

export interface TopEndpoint {
  endpoint: string;
  count: number;
}

export interface TimelineEvent {
  timestamp: string;
  event: string;
}

export interface RequestRatePoint {
  timestamp: string;
  request_count: number;
}

export interface Analysis {
  summary: Summary;
  top_ips: TopIP[];
  top_endpoints: TopEndpoint[];
  timeline: TimelineEvent[];
  request_rate_over_time: RequestRatePoint[];
}

export interface Anomaly {
  timestamp: string | null;
  ip: string;
  reason: string;
  confidence: number;
}

export interface UploadResponse {
  filename: string;
  analysis: Analysis;
  anomalies: Anomaly[];
  message?: string;
  metadata?: {
    rows_parsed: number;
    anomaly_count: number;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}