
cd db
kubectl create -f persistent-volume-bookstore.yaml
kubectl create -f persistent-volume-claim-bookstore.yaml
kubectl create -f mysql-pod.yaml
kubectl create -f mysql-service.yaml

cd ../server-api
kubectl create -f server-api-service.yaml

cd ../client
# kubectl create -f client-config.yaml
kubectl create configmap client-config --from-literal=BOOKSTORE_SERVER_API_URL=http://$(minikube ip) --from-literal=BOOKSTORE_SERVER_API_PORT=$(kubectl get svc bookstore-backend-service -o=jsonpath='{.spec.ports[?(@.port==9001)].nodePort}')

docker image build -t bookstore-client-container .
docker save bookstore-client-container | (eval $(minikube docker-env) && docker load)
kubectl create -f client-deploy.yaml
kubectl create -f client-service.yaml

cd ../server-api
kubectl create -f server-api-config.yaml
docker image build -t bookstore-server-api-container .
docker save bookstore-server-api-container | (eval $(minikube docker-env) && docker load)
kubectl create -f server-api-deploy.yaml




