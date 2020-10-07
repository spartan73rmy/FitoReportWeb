<template>
  <div>
    <b-navbar type="dark" class="header" variant="info" fixed="top">
      <b-navbar-brand to="/">FitoReporte</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/estadistica" disabled>Estadisticas</b-nav-item>
          <b-nav-item to="/portafolio">Portafolio</b-nav-item>
          <b-nav-item to="/registro">Registro</b-nav-item>
          <b-nav-item-dropdown text="Opciones" right>
            <b-dropdown-item to="/about">Acerca de</b-dropdown-item>
            <b-dropdown-item to="/contact">Contacto</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Buscar reporte"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Buscar</b-button
            >
          </b-nav-form>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Usuario</em>
            </template>
            <b-dropdown-item to="/login">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
