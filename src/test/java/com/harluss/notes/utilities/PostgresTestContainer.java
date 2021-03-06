package com.harluss.notes.utilities;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

@ActiveProfiles("test")
public class PostgresTestContainer {
  private static final String IMAGE_VERSION = "postgres:13-alpine";
  private static final String DB_NAME = "notes_test_db";

  static final PostgreSQLContainer TEST_CONTAINER;

  static {
    TEST_CONTAINER = new PostgreSQLContainer(IMAGE_VERSION).withDatabaseName(DB_NAME);
    TEST_CONTAINER.start();
  }

  @DynamicPropertySource
  static void setDatasourceProperties(DynamicPropertyRegistry propertyRegistry) {
    propertyRegistry.add("TEST_CONTAINER_DB_URL", TEST_CONTAINER::getJdbcUrl);
    propertyRegistry.add("TEST_CONTAINER_DB_USERNAME", TEST_CONTAINER::getUsername);
    propertyRegistry.add("TEST_CONTAINER_DB_PASSWORD", TEST_CONTAINER::getPassword);
  }
}
