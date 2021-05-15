package com.harluss.notes.aspects;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Aspect
@Component
@Log4j2
public class LoggingAspect {

  @Pointcut("execution(* com.harluss.notes..*.*(..))")
  private void publicMethodPointcut() {}

  @Before("publicMethodPointcut()")
  public void beforeAdvice(JoinPoint joinPoint) {
    final List<Object> args = Arrays.asList(joinPoint.getArgs());

    log.info("--> Enter:\t {} with args: {}", getClassAndMethod(joinPoint), args);
  }

  @AfterReturning(value = "publicMethodPointcut()", returning = "result")
  public void afterReturningAdvice(JoinPoint joinPoint, Object result) {

    log.info("<-- Return: {} with result: {}", getClassAndMethod(joinPoint), result);
  }

  @AfterThrowing(value = "publicMethodPointcut()", throwing = "exception")
  public void afterThrowingAdvice(JoinPoint joinPoint, Exception exception) {

    log.info("<-- Exit:\t {} with error message: {}", getClassAndMethod(joinPoint), exception.getLocalizedMessage());
  }

  private String getClassAndMethod(JoinPoint joinPoint) {
    final String className = joinPoint.getTarget().getClass().getSimpleName();
    final String methodName = joinPoint.getSignature().getName();

    return String.format("%s.%s", className, methodName);
  }
}
