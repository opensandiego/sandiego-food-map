# AWS Lambda Handler
#
# Use Dockerfile.lambda to package/upload (see the instructions in the Dockerfile)
# 
import json,os
import boto3,botocore

# TODO setup sentry and add to AWS Lambda Env 
if "SENTRY_DSN" in os.environ:
    import sentry_sdk
    from sentry_sdk.integrations.aws_lambda import AwsLambdaIntegration
    sentry_sdk.init(
        dsn=os.environ["SENTRY_DSN"],
        integrations=[AwsLambdaIntegration(timeout_warning=True)]
    )

def lambda_handler(event, context, local_output=False):
    # ALWAYs store token in env, not in code!
    salesforce_token = os.environ.get("SALESFORCE_TOKEN",None)

    if salesforce_token:
        pass #TODO query salesforce
    else: 
        data = json.loads(open("data/211sample.json").read())

    # TODO process Data
    result = [ o for o in data if o['service']['Service_Status__c'] == "Active"] 

    # TODO push to S3 location
    output_filename = "sandiego-foodmap-data.json"

    if local_output:
        print( "Would output to s3bucket:%s" % output_filename)
        print( json.dumps(result,indent=1) )
    else:
        s3_client = boto3.client('s3')

        s3_client.put_object( 
            Body = json.dumps(result), 
            Bucket=os.environ.get("S3_RESULTS_BUCKET","opensandiego"), 
            Key=result_key, 
            ContentType="application/json",
            ACL='public-read',
        )

if __name__ == "__main__":
    lambda_handler(None,None,local_output=True)
