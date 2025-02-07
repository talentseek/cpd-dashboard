#!/bin/bash

# List of campaign IDs
campaigns=(8 12 9 14 13)

# Define API endpoint
API_URL="http://localhost:3000/api/start-message-sequence"

# Run indefinitely
while true; do
  for campaignId in "${campaigns[@]}"; do
    echo "Starting campaign ID: $campaignId"

    # Run curl command in the background and save the process ID
    curl -X POST "$API_URL" \
         -H "Content-Type: application/json" \
         -d "{\"campaignId\": $campaignId}" &

    # Get the process ID (PID) of curl
    curl_pid=$!

    # Sleep for 5 minutes (300 seconds)
    sleep 300

    # Kill the curl process after 5 minutes
    kill $curl_pid 2>/dev/null

    echo "Stopped campaign ID: $campaignId. Moving to the next..."
  done
done