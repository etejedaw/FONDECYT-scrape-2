# Software de extracción de datos para proyecto FONDECYT

## Resiliencia comunitaria ante tsunami en la costa chilena: Modelando escenarios multidimensionales con una aproximación participativa

Para ejecutar en local:

1. Levantar la base de datos

```bash
docker compose up
```

2. Crear imagen de docker

```bash
docker build . -t tesis
```

3. Levantar proyecto

```bash
docker run -p 3000:3000 --net=host tesis
```
