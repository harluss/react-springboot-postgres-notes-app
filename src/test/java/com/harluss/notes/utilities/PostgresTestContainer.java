package com.harluss.notes.utilities;

import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;

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
    propertyRegistry.add("DB_URL", TEST_CONTAINER::getJdbcUrl);
    propertyRegistry.add("DB_USERNAME", TEST_CONTAINER::getUsername);
    propertyRegistry.add("DB_PASSWORD", TEST_CONTAINER::getPassword);
  }
}
