# Use Python 3.10.12 as the base image
FROM python:3.10.12

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable


# Use Waitress to serve the Flask app
CMD ["waitress-serve", "--port=80", "scraperApi:app"]
