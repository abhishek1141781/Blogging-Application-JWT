package com.abhishek.blog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.abhishek.blog.security.CustomUserDetailService;
import com.abhishek.blog.security.JWTAuthenticationEntryPoint;
import com.abhishek.blog.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableWebMvc
@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class SecurityConfig extends WebSecurityConfigurerAdapter{
public class SecurityConfig {

	public static final String[] PUBLIC_URLS = { "/api/v1/auth/**", "/v3/api-docs", "/v2/api-docs", "/swagger-ui/**",
			"/swagger-resources/**", "/webjars/**" };

	@Autowired
	private CustomUserDetailService customUserDetailService;

	@Autowired
	private JWTAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeHttpRequests().antMatchers(PUBLIC_URLS).permitAll().antMatchers(HttpMethod.GET)
				.permitAll().anyRequest().authenticated().and()
				// set authentication entry point
				.exceptionHandling().authenticationEntryPoint(this.jwtAuthenticationEntryPoint).and()
				.sessionManagement()
				// set stateless policy
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		

		// authentication filter
		http.addFilterBefore(this.jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		http.authenticationProvider(daoAuthenticationProvider());

		DefaultSecurityFilterChain build = http.build();
		return build;
	}

	/*
	 * @Override protected void configure(HttpSecurity http) throws Exception {
	 * 
	 * http .csrf().disable() .authorizeHttpRequests()
	 * .antMatchers(PUBLIC_URLS).permitAll()
	 * .antMatchers(HttpMethod.GET).permitAll() .anyRequest() .authenticated()
	 * .and() //set authentication entry point
	 * .exceptionHandling().authenticationEntryPoint(this.
	 * jwtAuthenticationEntryPoint) .and() .sessionManagement() // set stateless
	 * policy .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	 * 
	 * //authentication filter http.addFilterBefore(this.jwtAuthenticationFilter,
	 * UsernamePasswordAuthenticationFilter.class); }
	 */
	/*
	 * @Override protected void configure(AuthenticationManagerBuilder auth) throws
	 * Exception {
	 * 
	 * auth.userDetailsService(this.customUserDetailService).passwordEncoder(
	 * passwordEncoder()); super.configure(auth); }
	 */

	public DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setUserDetailsService(this.customUserDetailService);
		provider.setPasswordEncoder(passwordEncoder());
		return provider;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/*
	 * @Override public AuthenticationManager authenticationManagerBean() throws
	 * Exception {
	 * 
	 * return super.authenticationManagerBean(); }
	 */

	@Bean
	public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public FilterRegistrationBean corsFilter() {

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.addAllowedOriginPattern("*");
		corsConfiguration.addAllowedHeader("Authorization");
		corsConfiguration.addAllowedHeader("common");
		corsConfiguration.addAllowedHeader("Content-Type");
		corsConfiguration.addAllowedHeader("Accept");
		corsConfiguration.addAllowedMethod("POST");
		corsConfiguration.addAllowedMethod("GET");
		corsConfiguration.addAllowedMethod("DELETE");
		corsConfiguration.addAllowedMethod("PUT");
		corsConfiguration.addAllowedMethod("OPTIONS");
		corsConfiguration.setMaxAge(3600L);
//		corsConfiguration.addAllowedOriginPattern("/**");
//		corsConfiguration.addAllowedOriginPattern("http://localhost:3000");
		

		source.registerCorsConfiguration("/**", corsConfiguration);

		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

		bean.setOrder(-110);

		return bean;
	}

}
