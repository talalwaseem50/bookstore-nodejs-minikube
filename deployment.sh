echo "Secript deployment.sh started..!"



cd db
kubectl create -f persistent-volume-bookstore.yaml
if [ $? -ne 0 ]; then
   echo "Persistent Volume Bookstore failed. Exitting..!"
   exit 1
fi

kubectl create -f persistent-volume-claim-bookstore.yaml
if [ $? -ne 0 ]; then
   echo "Persistent Volume Claim Bookstore failed. Exitting..!"
   exit 1
fi

kubectl create -f mysql-pod.yaml
if [ $? -ne 0 ]; then
   echo "MySQL pod failed. Exitting..!"
   exit 1
fi

kubectl create -f mysql-service.yaml
if [ $? -ne 0 ]; then
   echo "MySQL service failed. Exitting..!"
   exit 1
fi



cd ../server-api
kubectl create -f server-api-service.yaml
if [ $? -ne 0 ]; then
   echo "Bookstore Server-API service failed. Exitting..!"
   exit 1
fi



cd ../client
# kubectl create -f client-config.yaml
kubectl create configmap client-config --from-literal=BOOKSTORE_SERVER_API_URL=http://$(minikube ip) --from-literal=BOOKSTORE_SERVER_API_PORT=$(kubectl get svc bookstore-backend-service -o=jsonpath='{.spec.ports[?(@.port==9001)].nodePort}')
if [ $? -ne 0 ]; then
   echo "Bookstore Client Config Map failed. Exitting..!"
   exit 1
fi



docker image build -t bookstore-client-container .
if [ $? -ne 0 ]; then
   echo "Bookstore Client Docker Image Build failed. Exitting..!"
   exit 1
fi

docker save bookstore-client-container | (eval $(minikube docker-env) && docker load)
if [ $? -ne 0 ]; then
   echo "Bookstore Client Docker Image Save failed. Exitting..!"
   exit 1
fi

kubectl create -f client-deploy.yaml
if [ $? -ne 0 ]; then
   echo "Bookstore Client Deployment failed. Exitting..!"
   exit 1
fi

kubectl create -f client-service.yaml
if [ $? -ne 0 ]; then
   echo "Bookstore Client Service failed. Exitting..!"
   exit 1
fi



cd ../server-api
kubectl create -f server-api-config.yaml
if [ $? -ne 0 ]; then
   echo "Bookstore Server-API Config Map failed. Exitting..!"
   exit 1
fi

docker image build -t bookstore-server-api-container .
if [ $? -ne 0 ]; then
   echo "Bookstore Server-API Image Build failed. Exitting..!"
   exit 1
fi

docker save bookstore-server-api-container | (eval $(minikube docker-env) && docker load)
if [ $? -ne 0 ]; then
   echo "Bookstore Server-API Image Save failed. Exitting..!"
   exit 1
fi

kubectl create -f server-api-deploy.yaml
if [ $? -ne 0 ]; then
   echo "Bookstore Server-API Deployment failed. Exitting..!"
   exit 1
fi



echo "Secript deployment.sh completed successfully..!"


