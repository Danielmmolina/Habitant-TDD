import React, { useState, useEffect } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import { Text, Button } from '@rneui/themed'
import { stylesNewPublicationScreen } from './NewPublicationStylesL'
import { styles } from '../../../../styles'
import { Image } from '@rneui/base'
import * as Font from 'expo-font';


export function NewPublicationScreenL() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFontsAsync = async () => {
      await Font.loadAsync({
        Lobster_400Regular: require('@expo-google-fonts/lobster'),
        Montserrat_400Regular: require('@expo-google-fonts/montserrat'),
      });
      setFontsLoaded(true);
    };

    loadFontsAsync();
  }, []);

  const [tituloPublicacion, setTituloPublicacion] = useState('Nueva Publicación');
  const [reglas, setReglas] = useState({
    noBeber: false,
    horarioLlegada: false,
    sinMascotas: false,
    sinVisitas: false,
    NoEscucharMusicaConVolumenAlto: false,
    NoFumar: false,
    RealizarAseo: false,
  });

  const [caracteristicas, setCaracteristicas] = useState({
    comedor: false,
    estacionamiento: false,
    tv: false,
    gastosComunesIncluidos: false,
    living: false,
    wifi: false,
  });

  const [habitaciones, setHabitaciones] = useState([
    { titulo: '', descripcion: '', valor: '', imagenes: [] },
  ]);
if (!fontsLoaded) {
  return <Text>Cargando fuentes...</Text>;
}

const toggleRegla = (regla) => {
  setReglas((prevReglas) => ({
    ...prevReglas,
    [regla]: !prevReglas[regla],
  }));
};
const toggleCaracteristica = (caracteristica) => {
  setCaracteristicas((prevCaracteristicas) => ({
    ...prevCaracteristicas,
    [caracteristica]: !prevCaracteristicas[caracteristica],
  }));
};
const renderBotonRegla = (nombreRegla, label) => (
  <TouchableOpacity
    key={nombreRegla}
    style={[
      stylesNewPublicationScreen.reglaButton,
      reglas[nombreRegla] ? stylesNewPublicationScreen.reglaButtonSelected : null,
    ]}
    onPress={() => toggleRegla(nombreRegla)}
  >
    <Text style={[
      stylesNewPublicationScreen.reglaButtonText,
      reglas[nombreRegla] ? stylesNewPublicationScreen.reglaButtonTextSelected : null,
    ]}>{label}</Text>
  </TouchableOpacity>
);

const renderBotonCaracteristica = (nombreCaracteristica, label) => (
  <TouchableOpacity
    key={nombreCaracteristica}
    style={[
      stylesNewPublicationScreen.caracteristicaButton,
      caracteristicas[nombreCaracteristica] ? stylesNewPublicationScreen.caracteristicaButtonSelected : null,
    ]}
    onPress={() => toggleCaracteristica(nombreCaracteristica)}
  >
    <Text style={[
      stylesNewPublicationScreen.caracteristicaButtonText,
      caracteristicas[nombreCaracteristica] ? stylesNewPublicationScreen.caracteristicaButtonTextSelected : null,
    ]}>{label}</Text>
  </TouchableOpacity>
);

const agregarHabitacion = () => {
  if (habitaciones.length < 6) {
    setHabitaciones((prevHabitaciones) => [
      ...prevHabitaciones,
      { titulo: '', descripcion: '', valor: '', imagenes: [] },
    ]);
  }
};
const eliminarHabitacion = (index) => {
  setHabitaciones((prevHabitaciones) => {
    const nuevasHabitaciones = [...prevHabitaciones];
    nuevasHabitaciones.splice(index, 1);
    return nuevasHabitaciones;
  });
};

const renderHabitacion = (habitacion, index) => (
  <View key={index} style={stylesNewPublicationScreen.habitacionContainer}>
    <Text style={stylesNewPublicationScreen.formLabel}>Habitación {index + 1}</Text>

    {/* Input para el título de la habitación */}
    <TextInput
      style={stylesNewPublicationScreen.textInput}
      placeholder="Título de la habitación"
      value={habitacion.titulo}
      onChangeText={(text) => {
        const nuevasHabitaciones = [...habitaciones];
        nuevasHabitaciones[index].titulo = text;
        setHabitaciones(nuevasHabitaciones);
      }}
    />

    {/* Input para la descripción de la habitación */}
    <TextInput
      style={stylesNewPublicationScreen.textInput}
      placeholder="Descripción de la habitación"
      value={habitacion.descripcion}
      onChangeText={(text) => {
        const nuevasHabitaciones = [...habitaciones];
        nuevasHabitaciones[index].descripcion = text;
        setHabitaciones(nuevasHabitaciones);
      }}
      multiline={true}
      numberOfLines={4} // Ajusta según sea necesario
    />

    {/* Input para el valor de la habitación */}
    <TextInput
      style={stylesNewPublicationScreen.textInput}
      placeholder="Valor de la habitación"
      value={habitacion.valor}
      onChangeText={(text) => {
        const nuevasHabitaciones = [...habitaciones];
        nuevasHabitaciones[index].valor = text;
        setHabitaciones(nuevasHabitaciones);
      }}
    />
    <TouchableOpacity style={stylesNewPublicationScreen.imageUploadButton}>
      <Text style={stylesNewPublicationScreen.imageUploadButtonText}>Agregar Imágenes</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={stylesNewPublicationScreen.agregarHabitacionButton}
      onPress={() => eliminarHabitacion(index)}
    >
      <Text style={stylesNewPublicationScreen.agregarHabitacionButtonText}>Eliminar Habitación</Text>
    </TouchableOpacity>
  </View>
);
return (
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.containerLogo}>
      <Image source={require('../../../../assets/LogoHabitant.png')} style={styles.logoImg} />
      <Text style={{ ...styles.logoText, fontFamily: 'Lobster_400Regular' }}> Habitant </Text>
    </View>
    
     {/* Título dinámico */}
    <Text style={{ ...stylesNewPublicationScreen.textTitle, fontFamily: 'Montserrat_400Regular' }}>{tituloPublicacion}</Text>

    {/* Formulario para detalles de la propiedad */}
    <View style={stylesNewPublicationScreen.formContainer}>
      <Text style={stylesNewPublicationScreen.formLabel}>Añadir Fotos de la propiedad</Text>
      <Text style={stylesNewPublicationScreen.formSubLabel}>
        Ejemplo: Vista de fuera de la propiedad, espacios comunes, patio, etc.
      </Text>

      {/*  componente para seleccionar imágenes*/}
      <TouchableOpacity style={stylesNewPublicationScreen.imageUploadButton}>
        <Text style={stylesNewPublicationScreen.imageUploadButtonText}>Seleccionar Imágenes</Text>
      </TouchableOpacity>
     {/* ----------------Espacio para el formulario con campos de texto propiedad----------------- */}
      <View style={stylesNewPublicationScreen.textInputContainer}>
      <Text style={stylesNewPublicationScreen.formLabel}>Titulo de la Publicación</Text>
        {/* Input dinámico para el título de la publicación */}
        <TextInput
          style={stylesNewPublicationScreen.textInput}
          placeholder="Ingrese el título"
          value={tituloPublicacion}
          onChangeText={(text) => setTituloPublicacion(text)}
        />

        <Text style={stylesNewPublicationScreen.formLabel}>Descripción</Text>
        <TextInput
          style={stylesNewPublicationScreen.textInput}
          placeholder="Ingrese la descripción"
          multiline={true}
          numberOfLines={4} // ajustar segun sea necesario las lineas de descripcion
        />

        <Text style={stylesNewPublicationScreen.formLabel}>Ubicación</Text>
        <TextInput
          style={stylesNewPublicationScreen.textInput}
          placeholder="Ingrese la ubicación"
        />
      </View>
      <Text style={stylesNewPublicationScreen.formLabel}>Presione las reglas de su propiedad:</Text>
       {/* Botones de reglas */}
      <View style={stylesNewPublicationScreen.reglasContainer}>
        {renderBotonRegla('noBeber', 'No Beber')}
        {renderBotonRegla('horarioLlegada', 'Horario de Llegada')}
        {renderBotonRegla('sinMascotas', 'Sin Mascotas')}
        {renderBotonRegla('sinVisitas', 'Sin Visitas')}
        {renderBotonRegla('noEscucharMusicaConVolumenAlto', 'No Tener La Música Con Volumen Alto')}
        {renderBotonRegla('noFumar', 'No Fumar')}
        {renderBotonRegla('realizarAseo', 'Realizar Aseo')}
      </View>
      <Text style={stylesNewPublicationScreen.formLabel}>Oprime las características de la propiedad:</Text>
      {/* Botones de características */}
      <View style={stylesNewPublicationScreen.caracteristicasContainer}>
        {renderBotonCaracteristica('comedor', 'Comedor')}
        {renderBotonCaracteristica('estacionamiento', 'Estacionamiento')}
        {renderBotonCaracteristica('tv', 'TV')}
        {renderBotonCaracteristica('gastosComunesIncluidos', 'Gastos Comunes Incluidos')}
        {renderBotonCaracteristica('living', 'Living')}
        {renderBotonCaracteristica('wifi', 'Wifi')}
        {/* Agrega más botones de características según sea necesario */}
      </View>
      {/* Sección de habitaciones */}
      <Text style={stylesNewPublicationScreen.formLabel}>Añadir Habitaciones:</Text>
      {habitaciones.map((habitacion, index) => renderHabitacion(habitacion, index))}
        <TouchableOpacity
          style={stylesNewPublicationScreen.agregarHabitacionButton}
          onPress={agregarHabitacion}
        >
          <Text style={stylesNewPublicationScreen.agregarHabitacionButtonText}>Agregar Habitación</Text>
        </TouchableOpacity>
    </View>
    
  </ScrollView>
);
}
